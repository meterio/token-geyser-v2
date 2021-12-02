
import { useState } from 'react'
import detectEthereumProvider from "@metamask/detect-provider";
import './networkDropdown.css'
import getChain from '../../config/chains'



const items = [{ id: 82, label: "Meter" }, { id: 361, label: "Theta" }]
export default function NetworkDropDown() {
    const [isOpen, setOpen] = useState(false);
    
    const [selectedItem, setSelectedItem] = useState(361);


    const toggleDropdown = () => setOpen(!isOpen);



    const handleItemClick = (id:number) => {
        const chain = getChain(id)
        selectedItem === id ? setSelectedItem(361) : setSelectedItem(id);
        setOpen(true)
        
        window.localStorage.setItem("chainId", id.toString())
        
        detectEthereumProvider().then((provider: any) => {
        
           
             provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${chain.networkId.toString(16)}`,
                  chainName: chain.name,
                  nativeCurrency: {
                    name: chain.nativeTokenSymbol,
                    symbol: chain.nativeTokenSymbol,
                    decimals: chain.decimals,
                  },
                  rpcUrls: [chain.rpcUrl],
                  blockExplorerUrls: [chain.blockExplorer],
                },
              ],
            }).then((result:any)=>{
                console.log(result)
                window.location.reload()
            })

           
          })

    }

    return (
        
        <div className='dropdown'>
            <div role='button' className='dropdown-header' onClick={toggleDropdown}>
                {items.find(item => item.id === selectedItem)?.label}
                <i style={{margin:"5px"}} className={`fa fa-chevron-right icon ${isOpen && "open"}`}/>
            </div>

            <div className={`dropdown-body ${isOpen && 'open'}`}>
                {items.map((item) => (
                    <div role='button' className="dropdown-item" onClick={() => handleItemClick(item.id)} key={item.id} id={item.id.toString()}>


                        <span className={`dropdown-item-dot ${item.id === selectedItem && 'selected'}`}>• </span>



                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    )
}

