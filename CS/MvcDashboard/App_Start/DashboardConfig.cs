using System.Web.Routing;
using DevExpress.DashboardWeb;
using DevExpress.DashboardWeb.Mvc;
using DevExpress.DataAccess.Sql;
using System.Web.Hosting;
using DevExpress.DataAccess.Excel;
using DevExpress.DashboardCommon;

namespace MvcDashboard {
    public static class DashboardConfig {
        public static void RegisterService(RouteCollection routes) {
            routes.MapDashboardRoute("dashboardControl", "DefaultDashboard");

            DashboardFileStorage dashboardFileStorage = new DashboardFileStorage("~/App_Data/Dashboards");
            DashboardConfigurator.Default.SetDashboardStorage(dashboardFileStorage);
            
            DataSourceInMemoryStorage dataSourceStorage = new DataSourceInMemoryStorage();
            
            // Registers an SQL data source.
            DashboardSqlDataSource sqlDataSource = new DashboardSqlDataSource("SQL Data Source", "NWindConnectionString");
            SelectQuery query = SelectQueryFluentBuilder
                .AddTable("SalesPerson")
                .SelectAllColumns()
                .Build("Sales Person");
            sqlDataSource.Queries.Add(query);
            dataSourceStorage.RegisterDataSource("sqlDataSource", sqlDataSource.SaveToXml());
            
            // Registers an Object data source.
            DashboardObjectDataSource objDataSource = new DashboardObjectDataSource("Object Data Source");
            objDataSource.DataId = "odsInvoices";
            dataSourceStorage.RegisterDataSource("objDataSource", objDataSource.SaveToXml());
            
            // Registers an Excel data source.
            DashboardExcelDataSource excelDataSource = new DashboardExcelDataSource("Excel Data Source");
            excelDataSource.ConnectionName = "xlsSales";
            excelDataSource.FileName = HostingEnvironment.MapPath(@"~/App_Data/Sales.xlsx");
            excelDataSource.SourceOptions = new ExcelSourceOptions(new ExcelWorksheetSettings("Sheet1"));
            dataSourceStorage.RegisterDataSource("excelDataSource", excelDataSource.SaveToXml());
            
            DashboardConfigurator.Default.SetDataSourceStorage(dataSourceStorage);
            DashboardConfigurator.Default.DataLoading += DataLoading;
        }

        private static void DataLoading(object sender, DataLoadingWebEventArgs e) {
            if(e.DataId == "odsInvoices") {
                e.Data = Invoices.CreateData();
            }
        }
    }
}