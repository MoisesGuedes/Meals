import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Search, Star, X, Check, Plus, Minus, ShoppingCart, XCircle, CheckCircle, AlertTriangle, Info } from 'angular-feather/icons';

const icons = {
  Search,
  Star,
  X,
  Check,
  Plus,
  Minus,
  ShoppingCart,
  XCircle,
  CheckCircle,
  AlertTriangle,
  Info
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
