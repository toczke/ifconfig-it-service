import { useEffect, useState } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';
import classes from './ScrollToTop.module.css';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls past first section (about 100vh)
      const shouldShow = window.scrollY > window.innerHeight * 0.5;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <ActionIcon
      className={classes.scrollToTop}
      variant="filled"
      size={48}
      radius="md"
      onClick={scrollToTop}
      aria-label="Przewiń do góry"
    >
      <IconArrowUp size={24} />
    </ActionIcon>
  );
} 