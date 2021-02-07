import React, { useEffect } from "react";
import Taro, { Config } from "@tarojs/taro";
import { View, Image, ScrollView } from "@tarojs/components";
import Skeletons from "@/components/skeletons/index.skeletions";
import { MenuContext } from "../../context/MenuContext";
import ListItem from "../ListItem/index.weapp";
import CategoryTitle from "../CategoryTitle";
import { IFurniture, IFurnitureCategory } from "@/type";

interface IListProps {}

const List: React.FC<IListProps> = props => {
  const { data, loading, categoryList } = React.useContext(MenuContext);
  const [list, setList] = React.useState<
    {
      category: IFurnitureCategory;
      funitureList: IFurniture[];
    }[]
  >([]);
  const [showSkeletions, setShowSkeletions] = React.useState(true);

  useEffect(() => {
    if (categoryList?.length && data?.length) {
      setList(
        categoryList.map(category => {
          return {
            category,
            funitureList: data
              .filter(item => item.furnitureCategoryId === category._id)
              .sort((a, b) => (a?.index || 0) - (b?.index || 0))
          };
        })
      );
    }
  }, [data, categoryList]);

  useEffect(() => {
    if (list.length && !loading) {
      setShowSkeletions(false);
    }
  }, [loading, list]);

  return (
    <View className="content-list">
      {showSkeletions ? (
        <Skeletons />
      ) : (
        <>
          {list?.map(item => {
            return (
              <View>
                <CategoryTitle
                  id={item.category._id}
                  name={item.category.name}
                />
                {item.funitureList.map(furniture => (
                  <ListItem key={furniture._id} data={furniture} />
                ))}
              </View>
            );
          })}
        </>
      )}
    </View>
  );
};

export default List;
