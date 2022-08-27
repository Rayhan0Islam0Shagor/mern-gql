import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../GQL/Queries/clientsQueries";
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p className="text-danger">Error :(</p>;

  return (
    <>
      {!loading && !error && data.clients && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>NO</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client, index) => (
              <ClientRow key={client.id} index={index} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Clients;
