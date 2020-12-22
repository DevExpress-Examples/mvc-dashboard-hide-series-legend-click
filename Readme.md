# ASP NET MVC Dashboard - Custom Property - How to hide series by clicking on a chart legend

This example illustrates how to hide series in a chart item by clicking on a legend icon. It is possible to enable or disable this functionality using a custom property:
![](images/cs_chart_legend_click.png)

Limitation:
Please note that this implementation works only when the chart coloring settings are set to Auto. Otherwise, you will have to redesign the extension.


*Files to look at*:

* [Index.cshtml](./CS/MvcDashboard/Views/Home/Index.cshtml)
* [CustomPropertyChartSeriesVisibility.js](./CS/MvcDashboard/Content/CustomPropertyChartSeriesVisibility.js)
