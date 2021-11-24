
import { ModalButton } from "styling/styles"
import { Modal } from "./Modal"


interface Props {
 
  open: boolean
  onClose: () => void,
  selectWallet: () => Promise<boolean>,
  selectedNetwork:(n:number) => void
}

export const NetworksModal: React.FC<Props> = ({ open, onClose,selectWallet, children, selectedNetwork }) => {
 

  const selectNetwork = async (chainId:number) => {
    
    selectedNetwork(chainId)
    await selectWallet()
    

  }
 
  return (
    <Modal onClose={onClose} open={open} >
     
      
        <div style={{marginLeft:"80px"}}>
       <b>Select Your Preferred Network</b>
       <ModalButton style={{width:'65%', margin:'18px'}} onClick={()=>selectNetwork(82)}> Meter Mainnet </ModalButton>
       <br/>
       <ModalButton  style={{width:'65%', margin:'18px'}} onClick={()=>selectNetwork(365)}> Theta Testnet </ModalButton>
      
        {children}
      </div>
      <Modal.Footer>
       
          <ModalButton  style={{width:'50%'}} onClick={onClose}> Close </ModalButton>
       
      </Modal.Footer>
    </Modal>
  )
}
