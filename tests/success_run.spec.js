const {test, expect, request} = require('@playwright/test');
//const { expect } = require('../playwright.config');

let director;
let year;
let writers;
let rated;
let Movie_Genres;
//let rating;
let IMDb_rating;
let Writers_name;


test('First Movie', async ({page})=>
{
    await page.goto('https://www.imdb.com/');
    // get title
    console.log(await page.title());
    const title1 = "IMDb: Ratings, Reviews, and Where to Watch the Best Movies & TV Shows";
    await expect(page).toHaveTitle("IMDb: Ratings, Reviews, and Where to Watch the Best Movies & TV Shows");
  // await expect(page).toHaveTitle(title1);
  const searchIcon = page.locator('#suggestion-search-button');
  await page.locator('#suggestion-search').fill("A Clockwork Orange");
  await searchIcon.click();
  const movie =  page.locator('.findResult');
  const movielist = await movie.first().locator('.result_text');
  const firstmovie = await movielist.textContent();
//   console.log(firstmovie);  
  await expect(movielist).toContainText('A Clockwork Orange');
//   console.log('Verified: that movie search with exact name returns result list with 1st result as the correct movie');
 
   
})

test('getting json respose' ,async ({page})=>
{
    await page.goto('https://www.omdbapi.com/?apikey=b569cb4e&t=A+Clockwork+Orange');
    const data = await page.locator('pre').textContent();
    console.log(data);

    const obj = JSON.parse(data);
    director = obj.Director;
    year = obj.Year;
    writers = obj.Writer;
    rated = obj.Rated;
    const rating = obj.Ratings[0].Value;
    const genre = obj.Genre

    Movie_Genres = genre.split(", ");

    IMDb_rating = rating.split("/")[0];
    Writers_name = writers.split(", ");
    console.log(Writers_name);
    console.log( Movie_Genres);


    console.log("-----------------------------------------");
    console.log(director);
    console.log(year);
    console.log(writers);
    console.log(rated);
    console.log(rating);
    console.log(IMDb_rating);

})

/* 2. Verify that movie page renders correct Director Name 
compared to the Movie metadata on OMDb http://www.omdbapi.com/ */

test('verify correct director name', async ({page})=>
{
    await page.goto('https://www.imdb.com/');
     
     
  const searchIcon = page.locator('#suggestion-search-button');
  await page.locator('#suggestion-search').fill("A Clockwork Orange");
  await searchIcon.click();
  const movie =  page.locator('.findResult');
  const movielist = await movie.first().locator('.result_text a');   
  await movielist.first().click();  
  
  await expect(page).toHaveTitle("A Clockwork Orange (1971) - IMDb");

  const dir_location = page.locator('[class="ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link"]');
   const Director = await dir_location.first().textContent();
   

   await expect(dir_location.first()).toContainText(director);
   console.log(Director + ":   verified Director name");
   
})

/* 3. Verify that movie page renders correct Release Year
 compared to the Movie metadata on OMDb http://www.omdbapi.com/ */

test('verify movie Release Year', async ({page})=>
{
    await page.goto('https://www.imdb.com/');
     
     
  const searchIcon = page.locator('#suggestion-search-button');
  await page.locator('#suggestion-search').fill("A Clockwork Orange");
  await searchIcon.click();
  const movie =  page.locator('.findResult');
  const movielist = await movie.first().locator('.result_text a');   
  await movielist.first().click();   
  await expect(page).toHaveTitle("A Clockwork Orange (1971) - IMDb");

  const year_X_location = page.locator('[class="ipc-link ipc-link--baseAlt ipc-link--inherit-color sc-8c396aa2-1 WIUyh"]');
   const Year = await year_X_location.first().textContent();
   console.log(Year);

   await expect(year_X_location.first()).toContainText(year);
   console.log(Year + ":   verified Movie year");
   
})

/* 4. Verify that movie page renders correct list of Writers compared to the
 Movie metadata on OMDb http://www.omdbapi.com/ */

test('verify correct Writers name', async ({page})=>
{
  await page.goto('https://www.imdb.com/');    
  const searchIcon = page.locator('#suggestion-search-button');
  await page.locator('#suggestion-search').fill("A Clockwork Orange");
  await searchIcon.click();
  const movie =  page.locator('.findResult');
  const movielist = await movie.first().locator('.result_text a');   
  await movielist.first().click();    
  await expect(page).toHaveTitle("A Clockwork Orange (1971) - IMDb");
  const movie_heading = await page.locator('[data-testid="hero-title-block__title"]').textContent();
  await expect(page.locator('[data-testid="hero-title-block__title"]')).toBeVisible();
  console.log(movie_heading +" : Displayed");

  const dir_location = page.locator('li.ipc-metadata-list__item').nth(1);
   const Wirector = await dir_location.locator('a').allTextContents();
   console.log(Wirector);

   var arrayLength = Wirector.length;
   
   function arrayEquals(Wirector, Writers_name) {
    return Array.isArray(Wirector) &&
        Array.isArray(Writers_name) &&
        Wirector.length === Writers_name.length &&
        Wirector.every((val, index) => val === Writers_name[index]);
   }

   var bool = arrayEquals(Wirector, Writers_name);
   expect(bool).toBeTruthy;
   console.log(Writers_name+" :verified correct Writers name ");      
})

/* 5. Verify that movie page renders correct list of Movie Genres compared to 
the Movie metadata on OMDb http://www.omdbapi.com/*/

test('verify correct Movie Genres', async ({page})=>
{
  await page.goto('https://www.imdb.com/');    
  const searchIcon = page.locator('#suggestion-search-button');
  await page.locator('#suggestion-search').fill("A Clockwork Orange");
  await searchIcon.click();
  const movie =  page.locator('.findResult');
  const movielist = await movie.first().locator('.result_text a');   
  await movielist.first().click();    
  await expect(page).toHaveTitle("A Clockwork Orange (1971) - IMDb");
  const movie_heading = await page.locator('[data-testid="hero-title-block__title"]').textContent();
  await expect(page.locator('[data-testid="hero-title-block__title"]')).toBeVisible();
  console.log(movie_heading +" : Displayed");

  const Genres_location = page.locator('[data-testid="genres"]');
   const Genres = await Genres_location.locator('a').allTextContents();
   console.log(Genres);    
   
   function arrayEquals(Genres, Movie_Genres) {
    return Array.isArray(Genres) &&
        Array.isArray(Movie_Genres) &&
        Genres.length === Movie_Genres.length &&
        Genres.every((val, index) => val === Movie_Genres[index]);
   }

   var bool = arrayEquals(Genres, Movie_Genres);
   expect(bool).toBeTruthy;
   console.log(Genres+" :verified correct Movie Genres ");      
})

/* 6. Verify that movie page renders correct movie Maturity Rating 
compared to the Movie metadata on OMDb http://www.omdbapi.com/ */

test('verify correct movie Maturity Rating ', async ({page})=>
{
    await page.goto('https://www.imdb.com/');
     
     
  const searchIcon = page.locator('#suggestion-search-button');
  await page.locator('#suggestion-search').fill("A Clockwork Orange");
  await searchIcon.click();
  const movie =  page.locator('.findResult');
  const movielist = await movie.first().locator('.result_text a');   
  await movielist.first().click();   
  await expect(page).toHaveTitle("A Clockwork Orange (1971) - IMDb");

  const year_X_location = page.locator('[class="ipc-link ipc-link--baseAlt ipc-link--inherit-color sc-8c396aa2-1 WIUyh"]');
   const Rated = await year_X_location.last().textContent();
   console.log(Rated);

   await expect(year_X_location.last()).toContainText(rated);
   console.log(Rated + ":   verified correct movie Maturity Rating");
   
})

/* 7. Verify that movie page renders correct IMDb Rating/Tomatometer Score compared 
to the Movie metadata on OMDb http://www.omdbapi.com/ */

test('verify correct movie IMDb Rating ', async ({page})=>
{
    await page.goto('https://www.imdb.com/');
     
     
  const searchIcon = page.locator('#suggestion-search-button');
  await page.locator('#suggestion-search').fill("A Clockwork Orange");
  await searchIcon.click();
  const movie =  page.locator('.findResult');
  const movielist = await movie.first().locator('.result_text a');   
  await movielist.first().click();   
  await expect(page).toHaveTitle("A Clockwork Orange (1971) - IMDb");
  
  const movie_heading = await page.locator('[data-testid="hero-title-block__title"]').textContent();
  await expect(page.locator('[data-testid="hero-title-block__title"]')).toBeVisible();
  console.log(movie_heading +" : Displayed");


  const rating_location =await page.locator('[data-testid="hero-rating-bar__aggregate-rating__score"]').first().locator('span');
   const Rating = await rating_location.allTextContents();    
    
   console.log(Rating);
   console.log(await rating_location.first().textContent());
   console.log(IMDb_rating);  

    await expect(rating_location.first()).toContainText(IMDb_rating);
    console.log(IMDb_rating + ":   verified IMDb movie Rating");
   
})