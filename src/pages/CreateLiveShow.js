import { Dialog } from '@material-ui/core';
import React, {  useState } from 'react'
import { useHistory } from 'react-router-dom';
import CreatePartyForm from '../components/CreatePartyForm';

function CreateLiveShow() {
    //   const handleOpenDialog = () => {
    //     isDialogOpen(true);
    //   };
    const history = useHistory();
      const [openDialog, isDialogOpen] = useState(true);
    //   useEffect(() => {
    //       isDialogOpen(true);
    //   })
      const handleDialogClose = () => {
        isDialogOpen(false);
        history.goBack();
      };
    return (
      <div className="liveShow__creating__room">
        <Dialog onClose={handleDialogClose} open={openDialog}>
          <div className="liveShow__creating__room__form">
            <CreatePartyForm closeCreateTheatrDialog={handleDialogClose} />
          </div>
        </Dialog>
      </div>
    );
}

export default CreateLiveShow
