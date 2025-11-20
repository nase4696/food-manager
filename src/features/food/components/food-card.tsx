"use client";

import { Calendar, MapPin, Tag } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { getFoodExpiryText, getFoodStatusStyles } from "../utils/food-utils";

interface FoodCardProps {
  food: {
    id: string;
    name: string;
    expiryDate: Date | null;
    category: {
      name: string;
      color: string;
    };
    storage: {
      name: string;
    };
  };
  isLoading?: boolean;
  onConsume?: () => void;
}

export function FoodCard({ food }: FoodCardProps) {
  const styles = getFoodStatusStyles(food.expiryDate);
  const expiryText = getFoodExpiryText(food.expiryDate);

  return (
    <Card className={`${styles.border} hover:shadow-md transition-shadow`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold leading-tight line-clamp-2">
            {food.name}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500 shrink-0" />
          <span className={`text-sm flex-1 ${styles.text}`}>{expiryText}</span>
        </div>

        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-gray-500 shrink-0" />
          <Badge className={styles.badge} variant="outline">
            {food.category.name}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500 shrink-0" />
          <span className="text-sm text-gray-600">{food.storage.name}</span>
        </div>
      </CardContent>
    </Card>
  );
}
