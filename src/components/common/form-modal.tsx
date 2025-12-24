'use client';

import { Modal, ModalProps, Button, Group } from '@mantine/core';
import { ReactNode } from 'react';

interface FormModalProps extends Omit<ModalProps, 'children'> {
  title: string;
  children: ReactNode;
  onSubmit: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
}

export function FormModal({
  title,
  children,
  onSubmit,
  onCancel,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  loading = false,
  ...modalProps
}: FormModalProps) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      modalProps.onClose();
    }
  };

  return (
    <Modal {...modalProps} title={title} centered>
      {children}
      <Group justify="flex-end" mt="xl">
        <Button variant="subtle" onClick={handleCancel} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button onClick={onSubmit} loading={loading}>
          {submitLabel}
        </Button>
      </Group>
    </Modal>
  );
}

