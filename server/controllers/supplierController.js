import { createSupplierService,getAllSuppliersService ,getSupplierByIdService,  updateSupplierService,deleteSupplierService,} from "../services/supplierService.js";

export const createSupplier = async (req, res) => {
  try {
    const result = await createSupplierService(req.body);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllSuppliers = async (req,res) => {
  try{
    const result = await getAllSuppliersService();

    return res.status(200).json(result);
  }catch(error){
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getSupplierById = async (req, res) => {
  try {
    const result = await getSupplierByIdService(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const result = await updateSupplierService(
      req.params.id,
      req.body
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const result = await deleteSupplierService(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};