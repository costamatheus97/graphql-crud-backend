import { Router } from "express";

import { CreateQuestionnaireController } from "@modules/questionnaires/useCases/createQuestionnaire/CreateQuestionnaireController";
import { DeleteQuestionnaireController } from "@modules/questionnaires/useCases/deleteQuestionnaire/DeleteQuestionnaireController";
import { ListQuestionnairesController } from "@modules/questionnaires/useCases/listQuestionnaires/ListQuestionnairesController";
import { ListQuestionnairesByIdController } from "@modules/questionnaires/useCases/listQuestionnairesById/ListQuestionnairesByIdController";
import { UpdateQuestionnaireController } from "@modules/questionnaires/useCases/updateQuestionnaire/UpdateQuestionnaireController";

const router = Router();

const createQuestionnaireController = new CreateQuestionnaireController();
const listQuestionnairesController = new ListQuestionnairesController();
const listQuestionnairesByIdController = new ListQuestionnairesByIdController();
const updateQuestionnaireController = new UpdateQuestionnaireController();
const deleteQuestionnaireController = new DeleteQuestionnaireController();

router.get("/", listQuestionnairesController.handle);

router.get("/:id", listQuestionnairesByIdController.handle);

router.post("/", createQuestionnaireController.handle);

router.put("/:id", updateQuestionnaireController.handle);

router.delete("/:id", deleteQuestionnaireController.handle);

export default router;
