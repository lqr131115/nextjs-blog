import { useRouter } from "next/router";

export default function UserPage() {
  const { query } = useRouter();
  const { id } = query;
  return <div>Hello, User: {id}!</div>;
}
