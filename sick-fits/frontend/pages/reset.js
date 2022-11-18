import RequestReset from '../components/RequestReset';
import ResetPassword from '../components/ResetPassword';

export default function Reset({ query }) {
  if (!query.token) {
    return (
      <div>
        <p>Sorry, you must request a reset link</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Reset Your Password</p>
      <ResetPassword token={query.token} />
    </div>
  );
}
