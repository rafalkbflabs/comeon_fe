import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RevenueShareValues } from './RevenueShareValues';
import { ManageRewardProvider } from '../../ManageRewardPage';

const mockMatchMedia = () =>
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

test('rendering empty state component', async () => {
  render(
    <ManageRewardProvider>
      <RevenueShareValues />
    </ManageRewardProvider>
  );

  await waitFor(() => expect(screen.getByText(/No data/i)).not.toBeUndefined());
});

test('add new row to table', async () => {
  mockMatchMedia();

  render(
    <ManageRewardProvider>
      <RevenueShareValues />
    </ManageRewardProvider>
  );

  await userEvent.click(screen.getByTestId(/add-new-item/i));
  await userEvent.type(screen.getByTestId(/product/i), 'Lottery');
  await userEvent.type(screen.getByTestId(/from/i), '10');
  await userEvent.type(screen.getByTestId(/to/i), '15');
  await userEvent.type(screen.getByTestId(/criterion/i), 'Tax Free');
  await userEvent.type(screen.getByTestId(/percantage/i), '10');
  await userEvent.click(screen.getByTestId(/save-row/i));

  await waitFor(() => {
    expect(screen.queryByTestId(/product/i)).toBeNull();
  });

  await waitFor(() => {
    expect(screen.queryByTestId(/from/i)).toBeNull();
  });

  await waitFor(() => {
    expect(screen.queryByTestId(/to/i)).toBeNull();
  });

  await waitFor(() => {
    expect(screen.queryByTestId(/criterion/i)).toBeNull();
  });

  await waitFor(() => {
    expect(screen.queryByTestId(/percantage/i)).toBeNull();
  });

  await waitFor(() => {
    expect(screen.queryByTestId(/save-row/i)).toBeNull();
  });

  await waitFor(async () => expect(await screen.findByText(/Lottery/i)).not.toBeNull());
  await waitFor(async () => expect(await screen.findByText(/€10.00/i)).not.toBeNull());
  await waitFor(async () => expect(await screen.findByText(/€15.00/i)).not.toBeNull());
  await waitFor(async () => expect(await screen.findByText(/Tax Free/i)).not.toBeNull());
  await waitFor(async () => expect(await screen.findByText(/10%/i)).not.toBeNull());
});

test('render validation errors', async () => {
  mockMatchMedia();
  render(
    <ManageRewardProvider>
      <RevenueShareValues />
    </ManageRewardProvider>
  );

  await userEvent.click(screen.getByTestId(/add-new-item/i));
  await userEvent.type(screen.getByTestId(/product/i), 'Lottery');
  await userEvent.type(screen.getByTestId(/from/i), 'this should be a number');
  await userEvent.type(screen.getByTestId(/to/i), 'this should be a number');
  await userEvent.type(screen.getByTestId(/criterion/i), 'Tax Free');
  await userEvent.type(screen.getByTestId(/percantage/i), '500');

  await waitFor(() => {
    expect(screen.getByTestId(/product/i)).not.toBeNull();
  });

  await waitFor(() => {
    expect(screen.getByTestId(/from/i)).not.toBeNull();
  });

  await waitFor(() => {
    expect(screen.getByTestId(/to/i)).not.toBeNull();
  });

  await waitFor(() => {
    expect(screen.getByTestId(/criterion/i)).not.toBeNull();
  });

  await waitFor(() => {
    expect(screen.getByTestId(/percantage/i)).not.toBeNull();
  });

  await waitFor(() => {
    expect(screen.getByTestId(/save-row/i)).not.toBeNull();
  });

  await waitFor(() =>
    expect(screen.getByTestId(/error-from/i)).toHaveTextContent(
      'You must specify a number'
    )
  );
  await waitFor(() =>
    expect(screen.getByTestId(/error-to/i)).toHaveTextContent(
      'You must specify a number'
    )
  );
  await waitFor(() =>
    expect(screen.getByTestId(/error-percantage/i)).toHaveTextContent(
      'Number cannot exceed 100.'
    )
  );
});
