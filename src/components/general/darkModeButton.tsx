import { MoonIcon } from '@heroicons/react/24/solid';
import { Button, Icon } from '@tremor/react';
import { useEffect, useState } from 'react';

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState<boolean>(localStorage.theme === 'dark');

  function setDarkTheme() {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
    setDarkMode(true);
  }

  function setLightTheme() {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
    setDarkMode(false);
  }

  function onThemeSwitcherItemClick() {
    if (!darkMode) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }

  useEffect(() => {
    const init = async () => {
      if (
        localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    init();
  }, []);

  return (
    <Button onClick={() => onThemeSwitcherItemClick()}>
      <Icon icon={MoonIcon} color='indigo' />
    </Button>
  );
};

export default DarkModeButton;
