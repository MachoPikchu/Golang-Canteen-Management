package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"golang-restaurant-management/database"
	"net/http"

	//"golang-restaurant-management/middleware"
	"golang-restaurant-management/routes"
	"os"
)

var foodCollection *mongo.Collection = database.OpenCollection(database.Client, "food")

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = "8000"
	}

	router := gin.New()
	router.Static("/css", "./templates/css")

	router.LoadHTMLGlob("templates/*.html")
	router.Use(gin.Logger())
	routes.UserRoutes(router)
	router.GET("/", func(c *gin.Context) {
		c.HTML(200, "login.html", map[string]string{"title": "Register"})
	})
	router.GET("/menu", func(c *gin.Context) {
		c.HTML(200, "menu.html", map[string]string{"title": "Register"})
	})
	router.GET("/main", func(c *gin.Context) {
		c.HTML(200, "index.html", map[string]string{"title": "Register"})
	})
	router.GET("/food/:menu_id", func(c *gin.Context) {
		menuID := c.Param("menu_id")
		fmt.Print(menuID)
		c.HTML(http.StatusOK, "food.html", gin.H{
			"menu_id": menuID,
			"title":   "Menu Foods",
		})
	})

	//router.Use(middleware.Authentication())
	routes.FoodRoutes(router)
	routes.MenuRoutes(router)
	routes.TableRoutes(router)
	routes.OrderRoutes(router)
	routes.OrderItemRoutes(router)
	routes.InvoiceRoutes(router)

	router.Run(":" + port)
}
