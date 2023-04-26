interface ContainerProps {
  children: React.ReactNode;
}
export const Container = ({ children }: ContainerProps): JSX.Element => {
  return (
    <div className='glass mx-10 max-w-7xl rounded-md p-10 xl:mx-auto'>
      {children}
    </div>
  );
};
