using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TesteBludata.Models.DAO;

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
    }
}
