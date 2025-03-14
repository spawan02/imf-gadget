import { Request, Response } from "express";
import { Gadget } from "../types/interface";
import { generateProbability, generateCodename } from "../utils/util";
import {gadgetSchema, uuidValidator, statusSchema} from "../validation/gadgetSchema";

import prisma from "../prismaClient";

const getGadgets = async (req: Request, res: Response) => {
    const { status } = req.query;

    try {
        let gadgets;
        if (status) {
            const validation = statusSchema.safeParse(req.query);
            if (!validation.success) {
                res.status(404).json({
                    message: "Error",
                });
                return;
            }
            gadgets = await prisma.gadget.findMany({
                where: {
                    status: validation.data.status,
                },
            });
        } else {
            gadgets = await prisma.gadget.findMany();
        }
        const response: Gadget[] = gadgets.map((gadget) => ({
            ...gadget,
            missionSuccessProbability: generateProbability(),
        }));

        res.status(200).json({ gadgets: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve gadgets" });
    }
};

const createGadget = async (req: Request, res: Response) => {
    try {
        
        const codename = generateCodename();
        const missionProbability = generateProbability();
        const newGadget = await prisma.gadget.create({
            data: {
                codename,
                missionSuccessProbability: missionProbability,
                status: "Available",
            },
        });

        res.status(201).json({
            message: newGadget.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add gadget" });
    }
};

const updateGadget = async (req: Request, res: Response) => {
    const uuid = uuidValidator.safeParse(req.params);
    const validation = gadgetSchema.safeParse(req.body);
    if (!uuid.success) {
        res.status(404).json({
            message: "UUID is wrong",
        });
        return;
    }
    if (!validation.success) {
        res.status(404).json({
            message: "Required fields are missing",
        });
        return;
    }
    const gadget = await prisma.gadget.findUnique({
        where: {
            id: uuid.data?.id,
        },
    });

    if (!gadget) {
        res.status(404).json({ error: "Gadget not found" });
        return;
    }

    const updatedGadget = await prisma.gadget.update({
        where: { id: uuid.data.id },
        data: {
            name: validation.data.name,
            status: validation.data.status,
        },
    });

    res.status(200).json(updatedGadget);
};

const deleteGadget = async (req: Request, res: Response) => {
    const uuid = uuidValidator.safeParse(req.params);
    if (!uuid.success) {
        res.status(404).json({
            message: "Incorrect uuid",
        });
        return;
    }

    const gadget = await prisma.gadget.findUnique({
        where: { id: uuid.data.id },
    });

    if (!gadget) {
        res.status(404).json({ error: "Gadget not found" });
        return;
    }

    const data = await prisma.gadget.update({
        where: { id: uuid.data.id },
        data: {
            status: "Decommissioned",
            deCommissionedAt: new Date(),
        },
    });

    res.status(200).json(data.deCommissionedAt);
};

export default {
    getGadgets,
    createGadget,
    updateGadget,
    deleteGadget,
};
