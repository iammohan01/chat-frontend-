import {Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import React from "react";
import alert from "../Scripts/alert.js";

export function  ThreeDotMenu({chatDetails,isByMe}){

    return <Menu
        outline={'none'} p={0} m={0} maxW={'15px'}
    >
        <MenuButton p={0} m={5} maxW={'15px'} className='three--dot' >
            ...
        </MenuButton>
        <MenuList zIndex={1}>
            <MenuItem
                style={{
                    backgroundColor : '#F1F1F1'
                }
                }
                _hover={
                    {
                        outline: 'none'
                    }
                }
                _focus={
                    {
                        outline: 'none',
                    }
                }
                onClick={()=>{
                        copyText(chatDetails.message)
                }

            }>Copy Text

            </MenuItem>

            {isByMe === 1 && <MenuItem
                mt={'10px'}
                _hover={{
                    outline: 'none'
                }}
                _focus={
                    {
                        outline: 'none'
                    }
                }
            >
                Unsend
            </MenuItem>}
        </MenuList>
    </Menu>
}

function copyText(text){
    navigator.clipboard.writeText(text)
    alert('success','Copied to ClipBoard.')
}
