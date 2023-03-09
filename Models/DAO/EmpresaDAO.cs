using Microsoft.AspNetCore.Authentication.OAuth.Claims;
using Microsoft.Data.SqlClient;
using System.ComponentModel.DataAnnotations;
using TesteBludata.Models.Entity;

namespace TesteBludata.Models.DAO
{
    public class EmpresaDAO
    {
        SqlConnection con = new SqlConnection("Data Source=DESKTOP-SCS9LTQ;Initial Catalog=TesteBludata;Integrated Security=True;TrustServerCertificate=True;");

        public List<Empresa> ListEmpresa()
        {
            var listEmpresa = new List<Empresa>();
            try
            {
                con.Open();
                string sql = "select * from Empresa";
                using (SqlCommand cmd = new SqlCommand(sql, con))
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var e = new Empresa();
                            e.Id = (int)reader["Id"];
                            e.Nome = reader["Nome"].ToString();
                            e.UF = reader["UF"].ToString();
                            e.CPF_ou_CNPJ = reader["CPF_ou_CNPJ"].ToString();
                            listEmpresa.Add(e);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                con.Close();
            }
            return listEmpresa;
        }

 
        public List<Empresa> EditForIdEmpresa(int id)
        {
            string sql = "select * from Empresa where Id=" + id;
            using (SqlCommand cmd = new SqlCommand(sql, con))
            {
                List<Empresa> dados = new List<Empresa>();
                Empresa e = null;
                try
                {
                    con.Open();
                    using(var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            e = new Empresa();
                            e.Id = (int)reader["Id"];
                            e.Nome = reader["Nome"].ToString();
                            e.UF = reader["UF"].ToString();
                            e.CPF_ou_CNPJ = reader["CPF_ou_CNPJ"].ToString();
                            dados.Add(e);
                        }
                    }

                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
                finally
                {
                   con.Close();
                }
                return dados;
            }
            
        }

        public void RegisterEmpresa(Empresa e)
        {
            string sql = @"insert into Empresa (Nome, UF, CPF_ou_CNPJ) 
                        values (@Nome, @UF, @CPF_ou_CNPJ)";
            SqlCommand cmd = new SqlCommand(sql, con);

            cmd.Parameters.AddWithValue("@Nome",e.Nome);
            cmd.Parameters.AddWithValue("@UF", e.UF);
            cmd.Parameters.AddWithValue("@CPF_ou_CNPJ", e.CPF_ou_CNPJ);
            try
            {
                con.Open();
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally 
            {
                con.Close();
            }
        }

        public void EditEmpresa(Empresa e)
        {
            string sql = @"update Empresa set Nome=@Nome, UF=@UF,
                                CPF_ou_CNPJ=@CPF_ou_CNPJ";

            SqlCommand cmd = new SqlCommand(sql, con);

            cmd.Parameters.AddWithValue("@Nome", e.Nome);
            cmd.Parameters.AddWithValue("@UF", e.UF);
            cmd.Parameters.AddWithValue("@CPF_ou_CNPJ", e.CPF_ou_CNPJ);

            try
            {
                con.Open();
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                con.Close();
            }
        }

        public void DeleteEmpresa(int Id)
        {
            string sql = @"delete from Empresa where Id=@Id";
            SqlCommand cmd = new SqlCommand(sql, con);
            cmd.Parameters.AddWithValue("@Id", Id);

            try
            {
                con.Open();
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                con.Close();
            }
        }
    }
}
