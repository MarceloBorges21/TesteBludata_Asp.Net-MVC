using Microsoft.VisualBasic;

namespace TesteBludata.Models.Entity
{
    public class Fornecedor
    {
        public int Id { get; set; }
        public int Id_Empresa { get; set; }
        public string Nome_Empresa { get; set; }
        public string Nome { get; set; }
        public string CPF_ou_CNPJ { get; set; }
        public string RG { get; set; }
        public DateFormat Data_Nasc { get; set; }
        public DateTime DateTime_Cadasto { get; set; }
        
    }
}
