import {ISharedModel} from "../int/ISharedModel";
import {Tweet} from "../../entities/Tweet";
import {ITweetService} from "../../services/int/ITweetService";
export class SharedModel implements ISharedModel {
    public static $inject: Array<string> = ["ITweetService", "$route", "$rootScope"];
    public tweets: Array<Tweet>;
    public routeToKeep: ng.route.ICurrentRoute;
    private _topbarCollapsed: Boolean;
    private _sidebarCollapsed: Boolean;
    private _route: ng.route.IRouteService;


    public get topbarCollapsed(): Boolean {
        return this._topbarCollapsed;
    }

    public get sidebarCollapsed(): Boolean {
        return this._sidebarCollapsed;
    }

    public saveRouteToKeep() {
      this.routeToKeep = this._route.current;
    }

    constructor(tweetService: ITweetService, $route: ng.route.IRouteService, $rootScope: ng.IRootScopeService) {
        this._sidebarCollapsed = false;
        this._topbarCollapsed = false;
        this.tweets = tweetService.getAll();

        this._route = $route;
        var _this = this;

        $rootScope.$on('$locationChangeSuccess', function () {
          console.log($route.current);
          if (_this.routeToKeep) {
            $route.current = _this.routeToKeep;
            _this.routeToKeep = null;
          }
      });

    }

    public toggleTopbar(): void {
        this._topbarCollapsed = !this._topbarCollapsed;
    }

    public toggleSidebar(): void {
        this._sidebarCollapsed = !this._sidebarCollapsed;
    }

}