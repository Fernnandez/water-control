import {
  Button,
  Grid,
  Group,
  Modal,
  NumberInput,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';

interface CreateDeviceModalProps {
  opened: boolean;
  onClose: () => void;
}

export const CreateDeviceModal = ({
  opened,
  onClose,
}: CreateDeviceModalProps) => {
  const form = useForm({
    initialValues: {
      name: '',
      mac: '',
      maxCapacity: 0,
    },
    validate: {},
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="New Device"
      centered
      padding="xl"
      size="md"
    >
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Grid grow gutter="xl" mt=".5rem">
          <Grid.Col span={6}>
            <TextInput
              label="Name"
              placeholder="Name"
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Mac Address"
              placeholder="Mac Address"
              {...form.getInputProps('mac')}
            />
            <NumberInput
              label="Max Capacity"
              hideControls
              min={0}
              precision={2}
              decimalSeparator=","
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
