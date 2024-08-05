'use client'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import {firestore} from '@/firebase'
import {Box, Typography, Modal} from '@mui/material'
import {collection, deleteDoc, doc, getDocs, query} from 'firebase/firestore'

export default function Home() {
  const [pantryItems, setPantryItems] = useState([])
  const [open, setOpen] = useState([])
  const [itemName, setItemName] = useState('')
  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'Pantry'))
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
  const docRef = doc(firestore, 'Pantry', item)
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
  const docRef = doc(firestore, 'Pantry', item)
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
      justifyContent="center" 
      alignItems="center"
      gap={2}
    >
      <Modal open={open} onClose={handleClose}>
        <Box 
        position= "absolute" 
        top="50%" 
        left="50%" 
        transform="translate(-50%, -50%)" 
        width={400} 
        bgcolor="white"
        border= "2px solid #000">
        boxShadow={24}
        p={4}

        </Box>
      </Modal>
      <Typography variant="h1">Pantry Tracker</Typography>

    </Box>
  )
}