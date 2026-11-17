import { Router } from 'express'
import Complaint from '../models/Complaint.js'

const router = Router()

// READ all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 })
    res.json(complaints)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// CREATE a complaint
router.post('/', async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body)
    res.status(201).json(complaint)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// UPDATE a complaint (e.g. change status)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Complaint.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) return res.status(404).json({ message: 'Not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE a complaint
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Complaint.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Not found' })
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router