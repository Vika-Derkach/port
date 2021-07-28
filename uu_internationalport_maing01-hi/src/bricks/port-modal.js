//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useRef, useImperativeHandle } from "uu5g04-hooks";
import Config from "./config/config";
import BoatCreateModalForm from "./forms/boat-create-modal-form";
import BoatUpdateModalForm from "./forms/boat-update-modal-form";
import PierDeleteForm from "./forms/pier-delete-form";
import PiersCreateModalForm from "./forms/piers-create-modal-form";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "PortModal",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const PortModal = createVisualComponentWithRef({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props, ref) {
    //@@viewOn:hooks
    const modalRef = useRef();
    //@@viewOff:hooks

    //@@viewOn:interface
    useImperativeHandle(ref, () => ({
      openCreatePiersModal: (callback) => {
        modalRef.current.open({
          header: <UU5.Bricks.Header content="Create pier  " level="4" />,
          content: <PiersCreateModalForm callback={callback} closeCallback={modalRef.current.close} />,
        });
      },

      openCreateBoatModal: (callback, urlId) => {
        modalRef.current.open({
          header: <UU5.Bricks.Header content="Create boat" level="4" />,
          content: <BoatCreateModalForm urlId={urlId} callback={callback} closeCallback={modalRef.current.close} />,
        });
      },
      openUpdateBoatModal: (boat, callback) => {
        modalRef.current.open({
          header: <UU5.Bricks.Header content="Update boat " level="4" />,
          content: <BoatUpdateModalForm boat={boat} callback={callback} closeCallback={modalRef.current.close} />,
        });
      },
      openDeletePierConfirm: (pier, callback) => {
        modalRef.current.open({
          header: <></>,
          content: <PierDeleteForm pier={pier} callback={callback} closeCallback={modalRef.current.close} />,
        });
      },
    }));
    //@@viewOff:interface

    //@@viewOn:render
    return <UU5.Bricks.Modal ref_={modalRef} />;
    //@@viewOff:render
  },
});

export default PortModal;
