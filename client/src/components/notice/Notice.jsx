import { useNoticeData } from "../contexts/ModalsContext";
import Modal from "../utils/Modal";

export function Notice() {
    const {imageState, noticeState, modalOpenState} = useNoticeData()

    return (
        <Modal modalOpen={modalOpenState[0]} setModalOpen={modalOpenState[1]} className="sm:w-96 p-10 grid justify-center gap-5">
            {imageState[0]}
            <div className="w-auto text-center font-light text-sm">{noticeState[0]}</div>
        </Modal>
    )
}