import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { DELETE_PROJECT } from "../GQL/Mutations/ProjectMutations";
import { GET_PROJECTS } from "../GQL/Queries/projectQueries";

export default function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate();

  const [deleteProject, { error }] = useMutation(DELETE_PROJECT, {
    variables: {
      id: projectId,
    },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  console.log(
    "🚀 ~ file: DeleteProjectButton.jsx ~ line 19 ~ DeleteProjectButton ~ error",
    error
  );

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={deleteProject}>
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
}
