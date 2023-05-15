import {
  Button,
  Grid,
  Group,
  Modal,
  NumberInput,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import useDevice from '../../services/useDevice';
import { notifications } from '@mantine/notifications';

interface CreateDeviceModalProps {
  opened: boolean;
  onClose: () => void;
}

export const CreateDeviceModal = ({
  opened,
  onClose,
}: CreateDeviceModalProps) => {
  const { createDevice } = useDevice();

  const form = useForm({
    initialValues: {
      name: '',
      mac: '',
      maxCapacity: 0,
    },
    validate: {},
  });

  const formatMacAddress = (input: string) => {
    const cleanedInput = input.replace(/[^A-Fa-f0-9]/g, ''); // Remove caracteres não permitidos
    let formattedMac = '';

    for (let i = 0; i < cleanedInput.length; i++) {
      if (i > 0 && i % 2 === 0 && formattedMac.length < 16) {
        formattedMac += ':';
      }
      formattedMac += cleanedInput[i];
    }

    return formattedMac;
  };

  const handleChangeMacAddress = (event: any) => {
    const input = event.target.value;
    const formattedMac = formatMacAddress(input);
    form.setFieldValue('mac', formattedMac);
  };

  const handleSubmit = (data: {
    name: string;
    mac: string;
    maxCapacity: number;
  }) => {
    createDevice({
      name: data.name,
      mac: data.mac,
      maxCapacity: data.maxCapacity,
    })
      .then(() => {
        notifications.show({
          color: 'green',
          title: 'Success',
          message: 'New device registered',
        });
        onClose();
      })
      .catch((error: any) => {
        console.log({ error });
        notifications.show({
          color: 'red',
          title: 'Error',
          message: error.message,
        });
      });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="New Device"
      centered
      padding="xl"
      size="md"
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit({ ...values }))}>
        <Grid grow gutter="xl" mt=".5rem">
          <Grid.Col span={6}>
            <TextInput
              label="Name"
              placeholder="Name"
              {...form.getInputProps('name')}
            />
            <TextInput
              maxLength={17}
              value={form.values.mac}
              onChange={handleChangeMacAddress}
              label="Mac Address"
              placeholder="Mac Address"
            />
            <NumberInput
              label="Max Capacity"
              hideControls
              min={0}
              precision={0}
              // decimalSeparator=","
              {...form.getInputProps('maxCapacity')}
            />
          </Grid.Col>
        </Grid>
        <Group position="apart" mt="md">
          <Button
            onClick={() => null}
            color="red"
            size="md"
            variant="subtle"
            pl="xl"
            pr="xl"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            color="blue"
            size="md"
            pl="xl"
            pr="xl"
            loading={false}
          >
            Salvar
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
