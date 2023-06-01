import { useState } from 'react';

type UseModalOutput = [boolean, { open: () => void; close: () => void }];

export function useModal(initialValue: boolean = false): UseModalOutput {
  const [opened, setOpened] = useState(initialValue);
  const open = () => setOpened(true);
  const close = () => setOpened(false);

  return [opened, { open, close }];
}
