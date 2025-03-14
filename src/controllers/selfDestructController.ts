import { Request, Response } from 'express';
import {uuidValidator} from '../validation/gadgetSchema';
import { generateConfirmationCode } from '../utils/util';
import prisma from '../prismaClient';


const selfDestructGadget = async (req: Request, res: Response) => {
    const validatedId = uuidValidator.safeParse(req.params)
    if(!validatedId.success){
        res.status(404).json({
            message: "Not found"
        })
        return
    }

    try {
    const gadget = await prisma.gadget.findUnique({
      where: { id: validatedId.data.id },
    });

    if (!gadget) {
       res.status(404).json({ error: 'Gadget not found' });
       return
    }

    const confirmationCode = generateConfirmationCode();

    await prisma.gadget.update({
      where: { id: validatedId.data.id},
      data: {
        status: 'Destroyed',
      },
    });

    res.status(200).json({
      message: `Self-destruct triggered for ${gadget.name}`,
      confirmationCode, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to self-destruct' });
  }
}

export default selfDestructGadget