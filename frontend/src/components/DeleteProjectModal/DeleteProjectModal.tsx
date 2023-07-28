import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button, { ButtonStyles } from "../Inputs/Button/Button";
import { ReactComponent as TrashIcon } from "../../assets/TrashIcon.svg";
import Modal from "../Modal/Modal";
import styles from './DeleteProjectModal.module.scss'



interface DeleteProjectModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    projectId: string;
}


export default function DeleteProjectModal({ showModal, setShowModal, projectId }: DeleteProjectModalProps) {
    const { useAuthReq } = useAuth();
    const authReq = useAuthReq();
    const navigate = useNavigate();

    const deleteProject = () => {
        authReq(`/api/project/${projectId}`, {
            method: 'DELETE'
        })
            .then(res => res?.json())
            .then(data => data.success ? navigate('/') : undefined)
    }


    return (
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className={styles.showDeleteModal}>
          <div className={styles.modalHeader}>
            <div className={styles.headerIconContainer}>
              <TrashIcon className={styles.icon} />
            </div>
            <h3>Delete this Project</h3>
            <p>
              Are you sure you want to delete this project? You won't be able to
              undo this action.
            </p>
          </div>

          <div className={styles.deleteButtonContainer}>
            <Button
              buttonStyle={ButtonStyles.SECONDARY}
              text={"Cancel"}
              onClick={() => setShowModal(false)}
              wide
            />
            <Button
              buttonStyle={ButtonStyles.PRIMARY_ALT}
              text={"Delete this Project"}
              onClick={() => deleteProject()}
              wide
            />
          </div>
        </div>
      </Modal>
    );
}