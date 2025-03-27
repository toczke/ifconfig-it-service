interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  deviceModel?: string;
  photo?: File | null;
}

export async function sendToDiscord(data: ContactFormData): Promise<boolean> {
  try {
    const botServerUrl = import.meta.env.VITE_BOT_SERVER_URL || 'http://localhost:3001';
    console.log('Sending data to:', botServerUrl);
    console.log('Data:', data);
    
    // Create FormData for file upload if there's a photo
    if (data.photo) {
      const formData = new FormData();
      formData.append('photo', data.photo);
      formData.append('data', JSON.stringify(data));
      
      console.log('Sending form data with photo');
      const response = await fetch(`${botServerUrl}/contact`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      return true;
    } else {
      // Send data without file
      console.log('Sending JSON data without photo');
      const response = await fetch(`${botServerUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();
      console.log('Server response:', responseData);
      return true;
    }
  } catch (error) {
    console.error('Error sending to server:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    return false;
  }
} 