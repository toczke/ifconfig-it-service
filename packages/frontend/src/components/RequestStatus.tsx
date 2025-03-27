import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Title, 
  Text, 
  Badge, 
  Timeline,
  Loader,
  Alert
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

interface ThreadMessage {
  content: string;
  author: string;
  timestamp: Date;
  isBot: boolean;
}

interface RequestStatus {
  status: string;
  title: string;
  description: string;
  color: number;
  timestamp: string;
  threadMessages: ThreadMessage[];
}

export function RequestStatus() {
  const { requestId } = useParams();
  const [status, setStatus] = useState<RequestStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BOT_SERVER_URL}/api/request/${requestId}`);
        if (!response.ok) {
          throw new Error('Request not found');
        }
        const data = await response.json();
        setStatus(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch request status');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [requestId]);

  if (loading) {
    return (
      <Container size="md" py="xl">
        <Loader size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="md" py="xl">
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" variant="filled">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!status) {
    return null;
  }

  const getStatusBadge = () => {
    switch (status.status) {
      case 'NEW_REQUESTS':
        return <Badge color="blue">New Request</Badge>;
      case 'IN_PROGRESS':
        return <Badge color="orange">In Progress</Badge>;
      case 'DONE':
        return <Badge color="green">Completed</Badge>;
      case 'REJECTED':
        return <Badge color="red">Rejected</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Container size="md" py="xl">
      <Paper shadow="sm" p="xl" radius="md">
        <Title order={2} mb="md">{status.title}</Title>
        <div className="mb-4">
          {getStatusBadge()}
        </div>
        
        <div className="mb-8">
          <Text size="lg" style={{ whiteSpace: 'pre-line' }}>
            {status.description}
          </Text>
        </div>

        {status.threadMessages.length > 0 && (
          <div>
            <Title order={3} mb="md">Service Updates</Title>
            <Timeline active={status.threadMessages.length - 1}>
              {status.threadMessages.map((msg, index) => (
                <Timeline.Item 
                  key={index}
                  title={msg.author}
                  color={msg.isBot ? "blue" : "gray"}
                >
                  <Text size="sm" style={{ whiteSpace: 'pre-line' }}>
                    {msg.content}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {new Date(msg.timestamp).toLocaleString()}
                  </Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        )}
      </Paper>
    </Container>
  );
} 