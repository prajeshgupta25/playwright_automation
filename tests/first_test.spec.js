const {test, expect} = require('@playwright/test');

var director="";
var year = "";
var rating = "";
var imdb = "";
var genre = "";

//API Call
test.only('getting json respose' ,async ({page})=>
{
    await page.goto('https://www.omdbapi.com/?apikey=b569cb4e&t=A+Clockwork+Orange');
    const data = await page.locator('pre').textContent();
    // console.log(data);

    const obj = JSON.parse(data);
    director = obj.Director;
    year = obj.Year;
    rating = obj.Rated;
    const imdb_data = obj.Ratings[0].Value;
    imdb = imdb_data.split("/");
    const genre_data = obj.Genre;
    genre = genre_data.split(", ")
    // console.log(genre[0]);
    // console.log(rating);
    // console.log(imdb[0]);
//    console.log("-----------------------------------------"); 
//    console.log(director);
})


//First Movie
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

//Director
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
//   console.log(Director + ":   verified Director name");

})

//Release Year
test('verify correct release year', async ({page})=>
{
    await page.goto('https://www.imdb.com/');
  const searchIcon = page.locator('#suggestion-search-button');
  await page.locator('#suggestion-search').fill("A Clockwork Orange");
  await searchIcon.click();
  const movie =  page.locator('.findResult');
  const movielist = await movie.first().locator('.result_text a');  
  await movielist.first().click();  
  await expect(page).toHaveTitle("A Clockwork Orange (1971) - IMDb");
  const year_location = page.locator('[class="ipc-link ipc-link--baseAlt ipc-link--inherit-color sc-8c396aa2-1 WIUyh"]');
   const Year = await year_location.first().textContent();
   await expect(year_location.first()).toContainText(year);

})


// Genre
test.only('verify correct genre', async ({page})=>
{
    await page.goto('https://www.imdb.com/');
  const searchIcon = page.locator('#suggestion-search-button');
  await page.locator('#suggestion-search').fill("A Clockwork Orange");
  await searchIcon.click();
  const movie =  page.locator('.findResult');
  const movielist = await movie.first().locator('.result_text a');  
  await movielist.first().click();  
  await expect(page).toHaveTitle("A Clockwork Orange (1971) - IMDb");
  const genre_list = page.locator('[class="sc-16ede01-3 bYNgQ ipc-chip ipc-chip--on-baseAlt"]');
  const genre_data = await genre_list.allTextContents();
//   const count = await genre_list.count();
//   for(let i=0;i<count;i++){
//     console.log(await genre_data.nth(i).textContent());
//   }
  console.log(genre_data[0]);
//    const Genre = await genre_location.first().textContent();
//    await expect(year_location.first()).toContainText(genre);

})


//Maturity_rating
test('verify correct maturity rating', async ({page})=>
{
    await page.goto('https://www.imdb.com/');
  const searchIcon = page.locator('#suggestion-search-button');
  await page.locator('#suggestion-search').fill("A Clockwork Orange");
  await searchIcon.click();
  const movie =  page.locator('.findResult');
  const movielist = await movie.first().locator('.result_text a');  
  await movielist.first().click();  
  await expect(page).toHaveTitle("A Clockwork Orange (1971) - IMDb");
  const rating_location = page.locator('[class="ipc-link ipc-link--baseAlt ipc-link--inherit-color sc-8c396aa2-1 WIUyh"]').nth(1);
   const Rating = await rating_location.textContent();
   await expect(rating_location).toContainText(rating);

})


//IMDB_rating
test('verify correct imdb rating', async ({page})=>
{
    await page.goto('https://www.imdb.com/');
  const searchIcon = page.locator('#suggestion-search-button');
  await page.locator('#suggestion-search').fill("A Clockwork Orange");
  await searchIcon.click();
  const movie =  page.locator('.findResult');
  const movielist = await movie.first().locator('.result_text a');  
  await movielist.first().click();  
  await expect(page).toHaveTitle("A Clockwork Orange (1971) - IMDb");
//   const movie_heading = await page.locator('[data-testid="hero-title-block__title"]').textContent();
//   await expect(page.locator('[data-testid="hero-title-block__title"]')).toBeVisible();
//   console.log(movie_heading +" : Displayed");
  const imdb_location = page.locator('[class="sc-7ab21ed2-1 jGRxWM"]');
   const Imdb = await imdb_location.first().textContent();
   console.log(Imdb);
   await expect(imdb_location.first()).toContainText(imdb[0]);

})