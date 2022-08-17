import { ClockLoader, MoonLoader, PropagateLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
      }}
    >
      <ClockLoader color="#000000" speedMultiplier={1.5} size={100} />
    </div>
  );
};
export default Loading;
