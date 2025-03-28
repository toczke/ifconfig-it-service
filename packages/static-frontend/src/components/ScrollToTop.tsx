import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
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
    <div className={classes.scrollToTopWrapper}>
      <Button
        className={classes.scrollToTop}
        variant="filled"
        onClick={scrollToTop}
        leftSection={<IconArrowUp size={20} />}
        aria-label="Powrót na górę"
      >
        Powrót na górę
      </Button>
    </div>
  );
} 