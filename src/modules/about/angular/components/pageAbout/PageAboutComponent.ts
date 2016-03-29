import {ISharedModel} from "../../../../tweets/core/models/int/ISharedModel";

export class PageAboutComponent implements ng.IComponentOptions {
    public controller: Function = PageAboutController;
    public template: string = require('./PageAboutComponent.html');
}

export class PageAboutController {
    // public route: ng.route.IRouteService;
    public userInput: string;
    public user: string;
    public static $inject: Array<string> = ["$route", "$routeParams", "$location", "$rootScope", "ISharedModel"];
    constructor(
      public $route: ng.route.IRouteService,
      public $routeParams: ng.route.IRouteParamsService,
      public $location: any,
      public $rootScope: ng.IRootScopeService,
      public sharedModel: ISharedModel
    ) {
      this.user = this.$route.current.params.user;
      console.log("constructor ran!");
    }

    public updateUser(): void {
      this.user = this.userInput;
      this.sharedModel.saveRouteToKeep();
      this.$route.updateParams({"user" : this.userInput});
    }

    public editUser(): void {
      this.userInput = this.user;
    }

}


export class PageTweetsComponent implements ng.IComponentOptions{
    public controller: Function = PageTweetsController;
    public template: string = `
        <tweet-sidebar ng-class="{'sidebar-collapsed': $ctrl.sharedModel.sidebarCollapsed}"></tweet-sidebar>
        <tweet-main></tweet-main>
    `
}
export class PageTweetsController {
    public static $inject: Array<string> = ["ISharedModel"];
    constructor(public sharedModel: ISharedModel) {
    }
}