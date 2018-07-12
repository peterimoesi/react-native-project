import Vexapp from './model';

export const testVexapp = async (req, res) => {
    const { title, description } = req.body;
    const newVex = new Vexapp({ title, description });

    try {
        return res.status(201).json({ vexItem : await newVex.save() });
    } catch (e) {
        return res.status(e.status).json({ error: true, message: 'Error with vex app' })
    }
}

export const getVexapp = async (req, res) => {
    try {
        return res.status(200).json({ vexItems : await Vexapp.find({}) });
    } catch (e) {
        return res.status(e.status).json({ error: true, message: 'Error with vex app' })
    }
}