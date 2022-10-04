import React from 'react';
import clsx from 'clsx';
import './SectionStyles.less';

type Props = {
  children: React.ReactNode;
  header?: React.ReactNode;
};
export const Section = ({ header, children, ...rest }: Props) => (
  <div className={clsx('section', header && 'section-with-header')} {...rest}>
    {header && <div className='section-header'>{header}</div>}
    {children}
  </div>
);
