from bs4 import BeautifulSoup
from splinter import Browser
import requests
import time

def init_browser():
    #executable_path = {"executable_path": "/usr/local/bin/chromedriver"}
    #return Browser("chrome", **executable_path, headless=False)
    executable_path = {'executable_path': 'chromedriver.exe'}
    return Browser('chrome', **executable_path, headless=False)

def scrape():
    browser = init_browser()
    # url of Mars news
    url = 'https://mars.nasa.gov/news'
    browser.visit(url)

    time.sleep(1)

    # Parse HTML with Beautiful Soup
    soup = BeautifulSoup(browser.html, 'html.parser')

    # Get the first list which is the lastest news
    item = soup.find('ul', class_="item_list")
    current_slide = item.find('li')

    news_title = current_slide.find('h3').text.strip()
    news_p = current_slide.find('div', class_='article_teaser_body').text.strip()

    # Close the browser after scraping
    browser.quit()

    browser = init_browser()
    # JPL Mars Space Images url
    url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(url)

    time.sleep(1)

    # Parse HTML with Beautiful Soup
    soup = BeautifulSoup(browser.html, 'html.parser')

    # Get the first image which is the current image of Mars
    article = soup.find('ul', class_="articles")
    current_slide = article.find('li')

    # Get the current Mars image url
    image = current_slide.find('div', class_='img')
    mars_img = 'https://www.jpl.nasa.gov' + image.img['src']

    # Close the browser after scraping
    browser.quit()

    browser = init_browser()
    # Mars Weather twitter account url
    url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(url)

    time.sleep(1)

    # Parse HTML with Beautiful Soup
    soup = BeautifulSoup(browser.html, 'html.parser')

    # Get the first image which is the current image of Mars
    stream = soup.find('ol', class_="stream-items js-navigable-stream")
    current_item = stream.find('li')

    text_container = current_item.find('div', class_="js-tweet-text-container")
    mars_weather = text_container.find('p').text.strip()
    link = text_container.find('p').find('a').text.strip()
    mars_weather = mars_weather.replace(link, '')

    # Close the browser after scraping
    browser.quit()
    
    # Mars facts url 
    url = "https://space-facts.com/mars/"

    # Retrive page from the request module
    response = requests.get(url)

    # Create BeautifulSoup object; parse with 'html.parser'
    soup = BeautifulSoup(response.text, 'html.parser')

    # Get the html table 
    facts_table = soup.find('table', class_="tablepress tablepress-id-mars")

    browser = init_browser()
    # url of Mars hemisphere
    url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(url)

    time.sleep(1)

    # Parse HTML with Beautiful Soup
    soup = BeautifulSoup(browser.html, 'html.parser')

    items = soup.find_all('div', class_="item")

    hemisphere_image_urls = []

    for item in items:
        title = item.find('h3').text.strip()
        link = 'https://astrogeology.usgs.gov' + item.find('a')['href']
        browser.visit(link)
        hemisphere = BeautifulSoup(browser.html, 'html.parser')
        img_url = hemisphere.find('ul').find('li').find('a')['href']
        img_dict = {"title": title, "img_url": img_url}
        hemisphere_image_urls.append(dict(img_dict))
    
    mars_data = {
        "news_title": news_title,
        "news_p": news_p,
        "mars_img": mars_img,
        "mars_weather": mars_weather,
        "facts_table": facts_table,
        "hemisphere_image": hemisphere_image_urls
    }

    # Close the browser after scraping
    browser.quit()

    # Return result
    return mars_data
    