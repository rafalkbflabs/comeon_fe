import { useRevenueShareValuesTable } from './useRevenueShareValuesTable';
import { act, renderHook } from '@testing-library/react';
import { useFormik } from 'formik';
import { ManageRewardProvider } from '../../../ManageRewardPage';

describe('useRevenueShareValuesTable', () => {
  const formInitialValues = {
    product: '',
    from: '',
    to: '',
    criterion: '',
    percantage: '',
  };

  it('should throw an error if hook has been called outside provider', () => {
    const { result: result2 } = renderHook(() =>
      useFormik({
        initialValues: formInitialValues,
        onSubmit: () => {},
      })
    );

    expect(() => {
      renderHook(() => useRevenueShareValuesTable({ formik: result2.current }));
    }).toThrow(
      Error('useManageRewardPlan must be used inside ManageRewardProvider')
    );
  });

  it('should return initial values', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ManageRewardProvider>
        {children}
      </ManageRewardProvider>
    );

    const { result: formikResult } = renderHook(() =>
      useFormik({
        initialValues: formInitialValues,
        onSubmit: () => {},
      })
    );
    const { result: rsvtResult } = renderHook(
      () => useRevenueShareValuesTable({ formik: formikResult.current }),
      { wrapper }
    );

    expect(rsvtResult.current.columns.length).toBe(6);
    expect(rsvtResult.current.criteria.length).toBe(0);
    expect(rsvtResult.current.disableAddingItem).toBeFalsy();
    expect(rsvtResult.current.setEditingKey).not.toBeUndefined();
  });
});
