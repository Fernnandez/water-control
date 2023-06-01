import {
  Button,
  Divider,
  Grid,
  Group,
  Image,
  Modal,
  NumberInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import img from '../../assets/casa.png';
import { IDevice } from '../../contexts/AppContext';
import useDevice from '../../services/useDevice';

interface EditDeviceModalProps {
  opened: boolean;
  device?: any;
  onClose: () => void;
}

export const EditDeviceModal = ({
  opened,
  device,
  onClose,
}: EditDeviceModalProps) => {
  const { createDevice } = useDevice();

  useEffect(() => {
    handleFormValues(device);
  }, [device]);

  const form = useForm({
    initialValues: {
      name: '',
      mac: '',
      maxCapacity: '',
      height: 0,
      baseRadius: 0,
      adrress: '',
    },
    validate: {},
  });

  const handleClose = () => {
    onClose();
  };

  const handleFormValues = (device: IDevice) => {
    form.setValues({
      name: device.name,
      mac: device.mac,
      maxCapacity: device.maxCapacity,
      baseRadius: Number(device.baseRadius),
      height: Number(device.height),
    });
  };

  const formatMacAddress = (input: string) => {
    const cleanedInput = input.replace(/[^A-Fa-f0-9]/g, '');
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

  // TODO implementar edit device no backend
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
          message: 'Changes saved',
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
      onClose={handleClose}
      title={
        <Group>
          <Image maw={30} mx="auto" radius="md" src={img} alt="Random image" />
          <Title order={3} color="#1A2F48">
            Edit Device
          </Title>
        </Group>
      }
      centered
      padding="xl"
      size="md"
    >
      <form onSubmit={form.onSubmit((values) => console.log({ ...values }))}>
        <Grid grow gutter="xl" mt=".5rem">
          <Grid.Col span={6}>
            <TextInput
              label="Name"
              placeholder="device name"
              required
              {...form.getInputProps('name')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              maxLength={17}
              value={form.values.mac}
              onChange={handleChangeMacAddress}
              label="Mac Address"
              disabled
              placeholder="00:00:00:00:00:00"
              required
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              label="Reservatory Address"
              placeholder="street and number - city - state"
              min={0}
              required
              {...form.getInputProps('address')}
            />
          </Grid.Col>
        </Grid>

        <Divider mt={'md'} mb="md" size="md" />

        <Grid grow gutter="xl" mb="1rem">
          <Grid.Col span={6}>
            <NumberInput
              label="Height (M)"
              hideControls
              min={0}
              precision={2}
              disabled
              required
              {...form.getInputProps('height')}
            />
            <NumberInput
              label="Base Radius (M)"
              hideControls
              min={0}
              disabled
              precision={2}
              required
              {...form.getInputProps('baseRadius')}
            />
            <NumberInput
              label="Max Capacity (L)"
              hideControls
              min={0}
              disabled
              precision={2}
              required
              {...form.getInputProps('maxCapacity')}
            />
          </Grid.Col>
        </Grid>

        <Group position="apart">
          <Button
            compact
            onClick={() => handleClose()}
            color="red"
            size="md"
            variant="outline"
            pl="xl"
            pr="xl"
          >
            Cancel
          </Button>
          <Button
            compact
            sx={{ ':hover': { backgroundColor: '#1A2F48' } }}
            type="submit"
            bg="#1A2F48"
            size="md"
            pl="xl"
            pr="xl"
            loading={false}
          >
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
