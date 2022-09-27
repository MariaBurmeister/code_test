import './Restaurants.scss';
import { FunctionComponent } from "react";
import { RestaurantResult } from "../hooks";
import { Restaurant } from "./Restaurant";
import { EmptyState } from './design-system';

export const Restaurants: FunctionComponent<{
  results: RestaurantResult;
}> = ({ results }) => {
  
  const {status, restaurants} = results;
  const isLoading = status === "LOADING";
  const isError = status === "ERROR";
  const isEmpty = status !== "ERROR" && restaurants.length === 0;

  return(
  <ol className="restaurant_list">
    {isLoading ?
    <>
      <Restaurant key={1}   name='Loading...' distance='Loading...' price='Loading...' veggies='Loading...' category='Loading...' address='Loading...'/>
      <Restaurant key={2}   name='Loading...' distance='Loading...' price='Loading...' veggies='Loading...' category='Loading...' address='Loading...'/>
      <Restaurant key={3}   name='Loading...' distance='Loading...' price='Loading...' veggies='Loading...' category='Loading...' address='Loading...'/>
    </>
    : isError ?
    <p>Something went bad! Please refresh page.</p>
    // <ErrorState message='Something went bad! Please try refreshing page.'/>
    : isEmpty ?
    <EmptyState message="No results seem to match the filtered criteria at the moment."/>
    : restaurants.map((result) => (
    <Restaurant key={result.name}  name={result.name} distance={result.distance} price={result.price} veggies={result.veggies} category={result.category} address={result.address}/>
    ))}
  </ol>
  )
  ;}
;
