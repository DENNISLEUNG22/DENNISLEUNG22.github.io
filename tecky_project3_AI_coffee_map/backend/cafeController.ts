import { Request, Response } from "express";
import { CafeService } from "./cafeService";

export class CafeController {
  constructor(private cafeService: CafeService) {}
  cafeBrand = async (req: Request, res: Response) => {
    let brand = req.params.brand;
    let result = await this.cafeService.cafeBrand(brand);
    console.log(result);

    res.json(result);
  };
}
