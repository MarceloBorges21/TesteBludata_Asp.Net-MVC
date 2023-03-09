using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TesteBludata.Models.DAO;
using TesteBludata.Models.Entity;

namespace TesteBludata.Controllers
{
    public class EmpresaController : Controller
    {
        EmpresaDAO DAO = new EmpresaDAO();
        public IActionResult Index()
        {
            var list = DAO.ListEmpresa().ToList();
            ViewBag.ListEmpresa = list;
            return View(list);

        }

      /*  public ActionResult EditForIdEmpresa(int Id)
        {
                ViewBag.Id = Id;

                var lista = DAO.EditForIdEmpresa(Convert.ToInt32(Id));
                ViewBag.ListaEdit = lista.ToList();

                foreach (var item in ViewBag.ListaEdit)
                {
                    ViewBag.Nome = item.Nome;
                    ViewBag.Uf = item.UF;
                    ViewBag.CPF_ou_CNPJ = item.CPF_ou_CNPJ;
                }
           

            return View();

        }*/

        [HttpPost]
        public JsonResult RegisterEmpresa(Empresa e)
        {
            DAO.RegisterEmpresa(e);
            return Json("Dados salvos com sucesso.");
        }

        public JsonResult CarregaDados(int Id)
        {
            var lista = DAO.EditForIdEmpresa(Id);
            return Json(lista);
        }
        [HttpPost]
        public JsonResult EditEmpresa(Empresa e)
        {
            DAO.EditEmpresa(e);
            return Json("Dados salvos com sucesso.");
        }

        [HttpPost]
        public JsonResult DeleteEmpresa(int Id)
        {
            DAO.DeleteEmpresa(Id);
            return Json("Dados exluido com sucesso.");
        }
    }
}
