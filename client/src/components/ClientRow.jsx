import { useMutation } from "@apollo/client";
import moment from "moment";
import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from "../GQL/Mutations/ClientMutations";
import { GET_CLIENTS } from "../GQL/Queries/clientsQueries";
import { GET_PROJECTS } from "../GQL/Queries/projectQueries";

const ClientRow = ({ client, index }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [
      { query: GET_CLIENTS },
      {
        query: GET_PROJECTS,
      },
    ],

    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: { clients: clients.filter((c) => c.id !== deleteClient.id) },
    //   });
    // },
  });

  // unix timestamp to date
  const date = moment.unix(client.createdAt).fromNow();

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
      <td>{date}</td>
    </tr>
  );
};

export default ClientRow;
