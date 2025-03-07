'use client'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import {firestore} from '@/firebase'
import {Box, Modal, Typography, Stack, TextField, Button} from '@mui/material'
import {collection, deleteDoc, doc, getDocs, query, getDoc, setDoc} from 'firebase/firestore'

export default function Home() {
  const [pantryItems, setPantryItems] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push({
        name: doc.id,
        ...doc.data(),

      })
  })
  setPantryItems(pantryList)
}
const addItem = async (item) => { 
  const docRef = doc(collection(firestore, 'pantry'), item)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    } else{
      await setDoc(docRef, {quantity: 1})
    }
  await updatePantry()
}

const removeItem = async (item) => {
  const docRef = doc(collection(firestore, 'pantry'), item)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const {quantity} = docSnap.data()
    if (quantity === 1){
      await deleteDoc(docRef)
    }
    else{
      await setDoc(docRef, {quantity: quantity - 1})
    }
  }
  await updatePantry()
}

useEffect(() => {
  updatePantry()
}, [])

const handleOpen = () => setOpen(true)
const handleClose = () => setOpen(false)

  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex" 
      flexDirection="column"
      justifyContent="center" 
      alignItems="center"
      gap={2}
    >
      <Modal open={open} onClose={handleClose}>
        <Box 
        position= "absolute" 
        top="50%" 
        left="50%" 
        width={400} 
        backgroundColor="white"
        border= "2px solid #000"
        boxShadow={24}
        p={4}
        display = "flex"
        flexDirection = "column"
        gap={3}
        sx={{
          transform: 'translate(-50%, -50%)',
        }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
            variant='outlined'
            fullWidth
            value={itemName}
            onChange={(e) =>{
              setItemName(e.target.value)
            }}
            />
            <Button
              variant='outlined'
              onClick={()=>{
               addItem(itemName)
               setItemName('')
               handleClose()
            }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant = "contained" onClick={()=> {
        handleOpen()
      }}
      >
        Add New Item
      </Button>
      <Box border = '1px solid #333'>
        <Box width='800px' height="100px"
        backgroundColor="#ADD8E6"
        display="flex"
        alignItems="center"
        justifyContent="center">
          <Typography variant="h2" color="#333">Pantry Items</Typography>
        </Box>
     
      <Stack width = "800px" height = "300px" spacing = {2} overflow="auto">
        {
          pantryItems.map(({name, quantity})=>(
            <Box key={name} 
            width="100%" 
            minHeight="150px" 
            display="flex"
            alignItems="center"
            justifyContent = "space-between"
            backgroundColor = "#f0f0f0"
            padding={5}
            >
              <Typography variant = 'h3' color = "#333" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant = 'h3' color = "#333" textAlign="center">
                {quantity}
              </Typography>
              <Stack direction = "row" spacing = {2}>
              <Button variant = "contained" onClick = {() =>{
                addItem(name)
              }}>
                Add
              </Button>
              <Button variant = "contained" onClick = {() =>{
                removeItem(name)
              }}
            >
                Remove
              </Button>
            </Stack>
            </Box>
          ))}
          </Stack>
        </Box>
    </Box> 
  )
}