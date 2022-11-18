import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function ResetPassword({ token }) {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
    password: '',
  });
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: { ...inputs, token },
  });
  async function handleSubmit(e) {
    e.preventDefault();
    console.log({ ...inputs, token });
    const res = await reset().catch(console.error);
    console.log(res);
    clearForm();
  }
  const succesfulError = data?.redeemUserPasswordResetToken;
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request A Password Reset</h2>
      <DisplayError error={error || succesfulError} />
      {data?.redeemUserPasswordResetToken === null && (
        <p>Success! You can now sign in!</p>
      )}
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Password Reset</button>
      </fieldset>
    </Form>
  );
}
