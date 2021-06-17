import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
// this way only debounce function is packaged in the bundle
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';

import { PhotoImage } from '../types';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    # We can search in multiple data types
    # searchTerms is not reserved term and we can use anything to identify the search result
    # basically we are fetching allProducts with filter conditions
    searchTerms: allProducts(
      # Search in multiple fields
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
    # shoes: allShoes() <-- example of other search
  }
`;

export type SearchProductType = {
  searchTerms: Array<{
    id: string;
    name: string;
    photo: PhotoImage;
  }>;
};

export default function Search() {
  const router = useRouter();

  const [findItems, { loading, data }] = useLazyQuery<SearchProductType>(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );

  const items = data?.searchTerms || [];

  const findItemsButChill = debounce(findItems, 350);

  // gets rid of errors caused by SSR
  resetIdCounter();
  const {
    inputValue,
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange({ inputValue: searchTerm }) {
      findItemsButChill({
        variables: {
          searchTerm,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      if (!selectedItem) {
        return;
      }
      router
        .push({
          pathname: `/product/${selectedItem.id}`,
        })
        .then(() => {})
        .catch(() => {});
    },
    itemToString: (item) => item?.name || '',
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              key={item.id}
              {...getItemProps({ item })}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width={50}
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem highlighted={false}>
            Sorry, no items found for {inputValue}
          </DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
