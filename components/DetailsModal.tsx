import React from 'react'

const DetailsModal = (props:any) => { 
  console.log('detailsModal : ' + props.show) 
  const showHideClassName = props.show?"details-modal fixed top-0 left-0 w-full h-full bg-black":"details-modal hidden"

  return (
    <div className={showHideClassName}>
      <section className="modal-main p-10 bg-gray-100 h-full">
        <div className="flex justify-end">
          <button type="button" onClick={props.handleClose} >[X]</button>
        </div>
        <div className="mx-auto overflow-hidden">
          {props.children}
        </div>
      </section>
    </div>
  );
}

export default DetailsModal